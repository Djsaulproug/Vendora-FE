import { createServer, Model, Factory, RestSerializer } from 'miragejs'

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,
    serializers: {
      application: RestSerializer,
    },
    models: {
      vendor: Model,
      product: Model,
      order: Model,
      user: Model,
    },

    factories: {
      vendor: Factory.extend({
        name(i) {
          return `Vendor ${i + 1}`
        },
      }),
      product: Factory.extend({
        name(i) {
          return `Product ${i + 1}`
        },
        price() {
          return Math.floor(Math.random() * 90) + 10
        },
      }),
    },

    seeds(server) {
      let v1 = server.create('vendor', { id: '1', name: 'Acme Supplies' })
      let v2 = server.create('vendor', { id: '2', name: 'Gadgetry LLC' })

      server.create('product', { id: '1', vendorId: v1.id, name: 'Acme Hammer', price: 25, description: 'Sturdy hammer' })
      server.create('product', { id: '2', vendorId: v1.id, name: 'Acme Nails (100)', price: 5, description: 'Box of nails' })
      server.create('product', { id: '3', vendorId: v2.id, name: 'Gadget Pro', price: 199, description: 'Multi-purpose gadget' })
      server.create('product', { id: '4', vendorId: v2.id, name: 'Gadget Case', price: 29, description: 'Protective case' })

      server.create('user', { id: 'u1', name: 'Demo Buyer', email: 'buyer@example.com' })
    },

    routes() {
      this.namespace = 'api'

      // Vendors
      this.get('/vendors', (schema) => {
        return schema.vendors.all()
      })

      this.get('/vendors/:id', (schema, request) => {
        return schema.vendors.find(request.params.id)
      })

      // Products
      this.get('/products', (schema, request) => {
        let vendorId = request.queryParams.vendorId
        if (vendorId) {
          return schema.products.where({ vendorId })
        }
        return schema.products.all()
      })

      this.get('/products/:id', (schema, request) => {
        return schema.products.find(request.params.id)
      })

      // Auth (fake)
      this.post('/auth/login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        if (attrs.email) {
          // find or return demo user
          let user = schema.users.findBy({ email: attrs.email })
          if (!user) {
            user = schema.users.create({ id: `u${Math.floor(Math.random()*10000)}`, name: attrs.name || "Guest", email: attrs.email })
          }
          return { token: 'fake-jwt-token', user: user.attrs }
        }
        return new Response(401, {}, { error: 'Invalid' })
      })

      this.post('/auth/register', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        if (!attrs.email) return new Response(400, {}, { error: 'Email required' })
        let existing = schema.users.findBy({ email: attrs.email })
        if (existing) return new Response(409, {}, { error: 'User exists' })
        let user = schema.users.create({ id: `u${Math.floor(Math.random()*10000)}`, name: attrs.name || 'New User', email: attrs.email })
        return { token: 'fake-jwt-token', user: user.attrs }
      })

      // Vendor onboarding
      this.post('/vendors', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        if (!attrs.name) return new Response(400, {}, { error: 'Name required' })
        let vendor = schema.vendors.create({ id: String(Math.floor(Math.random()*10000)), name: attrs.name })
        return vendor
      })

      // Product create
      this.post('/products', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        if (!attrs.name || !attrs.vendorId) return new Response(400, {}, { error: 'Name and vendorId required' })
        let product = schema.products.create({ id: String(Math.floor(Math.random()*10000)), ...attrs })
        return product
      })

      // Orders
      this.post('/orders', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.orders.create({ ...attrs, status: 'created', id: String(Math.floor(Math.random() * 10000)) })
      })

      // Passthrough any other requests to prevent blocking assets
      this.passthrough()
    },
  })

  return server
}

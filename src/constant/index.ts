import admin from 'firebase-admin'

admin.apps.length === 0 &&
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCYW6dTjoCH8kLB\nFxhvNiVU9808X5mTIOXsTkxcDjcRR9NSbMQBboLw5vWRWRED8J9mMvzT33RPgUPi\n4K/N37dB2Nkdz5sEUgU9oxQGc1dVjfevkuiEpyiM9uv9DKf4s8LwAHHfAPsvXylS\nahDtIvezZw41fCe3+cx4I9Zwbo5oRqsyzl8ynJAJeV8QDnBygxnq5G7IjuXkpCZA\noKmhTgHw+4giAM320FEDdWfoziMOyqMn/AJ2zgw59U8Qoz9wwDvyBRg7ptRF1i4x\nOKk4trrB1+3WUUaplVtMSc7R+EnUmeUrGp2bzwlnd9oaoulGWWcS6yVXgvAgaRPb\nnVVwEGHXAgMBAAECggEAJLjSl70dFac6l7etWADA9r3TZd3U8jVXtaEZnoZ+l1es\ng41boMy2GsJQJfxFsaFpigR4E8kkC5WoeyKUvRZS4TgW/KxxPJVYVgbcaMGcJy7U\nqCjMikyP5YoOTyuhwLvzHE2/JHTkFgLlvst50O5ArakFL7cBC8LVmY9pvCepg1BF\n0jZakKGsaq+hU1HwHafMyFP3PRsDLg5qCpeEhykLVa4eSjjNLXfe8J7rJzr5FgmK\nOxIt186jg/dY0mUYndR3YBUO09UneH16h0zXtSouP9S0WKcx7TrV5iITZIGFcL0F\nsckJ0tvKjD7Kv3EC2cwbEWEdss/GTkTdJvVQuhYt4QKBgQDQsN7rBJYPQVvdZYc/\nol/61qk/QN2yJd+sSTpn7bPtRamsBcl6i5+m+EH8K5tKFoyuvdk2AL00hW5sasx3\nBZern2HET1DE+H6wez9t2P8KdHwJknVuIVrsUdpCerYhPg3HmEfIDXoZCP1qQ8X+\ny1CbBJ3XLlDY+Wg/Atnfie+78wKBgQC65ZIn5TipbA+RkM3LwUsUcgXnv+zWgd6Z\nleAD4OPgsvIcitMtt7u15iegR088huH2J66dXWyEr1v1GFs9UXg3TpyagT43A55c\nxC5Gr544qiSG5JI51HOwgI/vzsikXsGwCTelU6M6AuvmTleYbfTRBgBOa+DYPMxl\naaz4iLrvjQKBgQCj+TVOaC4YEnzB+tJIN6c+iog1QRxwq72Ru3/+xRDI8CGfHnTu\nquJo6Uu/fevoTMuBSX5wJiiEKgtXeJrrMiO4H+VLwB5whefVdyGhiAztBBWp18AZ\nJnAwmyfpcE3G1OEy4P4VvDEhlqS3aEUcLFhLVVdICgZQVbeJOw5BzDnn7QKBgAz+\nIKb9XG8KwBpSgrwDeAC33Ik74m8XIC51KNmcLLtWNVaeoAexmi8PDPoreuquRc8i\n+xSdhgnDVxU22EDvBPhzUpe7HGQesEeqq7zmQI2X5moqQbAbgN9oUJlPOsuSesyO\nF3w60EIcKeIc2CIUosxVKnhJL5xYvazfJ9MvTi+RAoGAGqAkgYMCCYmXC05ZmB7p\nxSkuNiBr8dVJq51F1Loj44WqifILc9o3xciN5uLY6qR01IkJisQ0SRsSeX1mO8Uk\nJtQBSwrJLpCDeTVHSKiVOMWJ5FPJh9A8opZaxwbWzYmXnGuBO/YwX0TbECza3UtZ\nhFljEZWe3iRETvNitbvZYSY=\n-----END PRIVATE KEY-----\n',
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })

export { admin }

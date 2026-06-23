import type { Schema, Struct } from '@strapi/strapi';

export interface VariantVariant extends Struct.ComponentSchema {
  collectionName: 'components_variant_variants';
  info: {
    displayName: 'Variant';
  };
  attributes: {
    APMC: Schema.Attribute.Decimal;
    gst: Schema.Attribute.Decimal;
    originalPrice: Schema.Attribute.Decimal;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    weight: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'variant.variant': VariantVariant;
    }
  }
}

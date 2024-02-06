import React from 'react';
import { CardContainer, LabelCard, Input } from './PaymentForm.style';

const PaymentCard = ({ onChange, cardDetails }) => {
  return (
    <CardContainer>
      <LabelCard>
        Cardholder Name
        <Input
          type="text"
          value={cardDetails.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </LabelCard>

      <LabelCard>
        Email
        <Input
          type="email"
          value={cardDetails.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </LabelCard>

      <LabelCard>
        Address Line 1
        <Input
          type="text"
          value={cardDetails.address.line1}
          onChange={(e) => onChange('line1', e.target.value)}
        />
      </LabelCard>

      <LabelCard>
        City
        <Input
          type="text"
          value={cardDetails.address.city}
          onChange={(e) => onChange('city', e.target.value)}
        />
      </LabelCard>

      <LabelCard>
        Postal Code
        <Input
          type="text"
          value={cardDetails.address.postal_code}
          onChange={(e) => onChange('postal_code', e.target.value)}
        />
      </LabelCard>

      <LabelCard>
        Country
        <Input
          type="text"
          value={cardDetails.address.country}
          onChange={(e) => onChange('country', e.target.value)}
        />
      </LabelCard>
    </CardContainer>
  );
};

export default PaymentCard;

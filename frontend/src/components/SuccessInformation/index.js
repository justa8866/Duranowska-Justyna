import { SuccessContainer, SuccessTitle, SuccessMessage } from './SuccessInformation.style';

const SuccessInformation = () => (
  <SuccessContainer>
    <SuccessTitle>Thank you for your payment!</SuccessTitle>
    <SuccessMessage>Your payment has been successfully processed.</SuccessMessage>
    <SuccessMessage>You will receive an email with the details of your order.</SuccessMessage>
    <SuccessMessage>Your order will be delivered within 7 days to the provided address.</SuccessMessage>
    <SuccessMessage>Thank you for shopping with us!</SuccessMessage>
  </SuccessContainer>
);

export default SuccessInformation;

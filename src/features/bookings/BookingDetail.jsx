import styled from 'styled-components';
import { useBooking } from './useBooking';
import {
  Calendar,
  Users,
  CreditCard,
  MapPin,
  User,
  Mail,
  IdCard,
  Globe,
  Home,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutButton from '../check-in-out/CheckoutButton';
import Empty from '../../ui/Empty';
const Container = styled.div`
  padding: 2.4rem;
  max-width: 1400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1.6rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${(props) => props.accentColor || 'linear-gradient(90deg, #3b82f6, #8b5cf6)'};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
  }
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  font-weight: 600;

  svg {
    color: ${(props) => props.iconColor || '#3b82f6'};
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const FullWidthSection = styled.div`
  grid-column: 1 / -1;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.2rem;
  background: #f8fafc;
  border-radius: 0.8rem;
  border-left: 4px solid ${(props) => props.borderColor || '#e2e8f0'};
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    transform: translateX(4px);
  }
`;

const Label = styled.span`
  color: #64748b;
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Value = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
  color: #1e293b;
`;

const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    switch (props.status) {
      case 'unconfirmed':
        return `
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          color: #1e40af;
          border: 2px solid #3b82f6;
        `;
      case 'checked-in':
        return `
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #166534;
          border: 2px solid #22c55e;
        `;
      case 'checked-out':
        return `
          background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
          color: #475569;
          border: 2px solid #94a3b8;
        `;
      default:
        return `
          background: linear-gradient(135deg, #fef3c7, #fde68a);
          color: #92400e;
          border: 2px solid #f59e0b;
        `;
    }
  }}
`;

const PaymentStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;

  ${(props) =>
    props.isPaid
      ? `
    background: linear-gradient(135deg, #dcfce7, #bbf7d0);
    color: #166534;
  `
      : `
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #dc2626;
  `}
`;

const CabinWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: flex-start;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  padding: 2rem;
  border-radius: 1.2rem;
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CabinImage = styled.img`
  width: 220px;
  height: 160px;
  border-radius: 1.2rem;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 3px solid #fff;
`;

const CabinInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CabinName = styled.h4`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CabinDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #64748b;
  font-size: 1.4rem;

  svg {
    color: #3b82f6;
  }
`;

const PriceBreakdown = styled.div`
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  padding: 2rem;
  border-radius: 1.2rem;
  border: 1px solid #e2e8f0;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: ${(props) => (props.isTotal ? '2px solid #3b82f6' : '1px solid #e2e8f0')};

  &:last-child {
    border-bottom: none;
    margin-top: 1rem;
    padding-top: 1.5rem;
  }
`;

const PriceLabel = styled.span`
  font-size: ${(props) => (props.isTotal ? '1.8rem' : '1.4rem')};
  font-weight: ${(props) => (props.isTotal ? '700' : '500')};
  color: ${(props) => (props.isTotal ? '#1e293b' : '#64748b')};
`;

const PriceValue = styled.span`
  font-size: ${(props) => (props.isTotal ? '2.2rem' : '1.6rem')};
  font-weight: ${(props) => (props.isTotal ? '800' : '600')};
  color: ${(props) => (props.isTotal ? '#059669' : '#1e293b')};
`;

const NotesSection = styled.div`
  background: linear-gradient(135deg, #fef7ff, #f3e8ff);
  padding: 1.8rem;
  border-radius: 1rem;
  border-left: 4px solid #8b5cf6;
  margin-top: 1rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.6rem;
  color: #64748b;
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.6rem;
  color: #dc2626;
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  border-radius: 1rem;
  padding: 2rem;
`;

function BookingDetail() {
  const { data, isLoading, error } = useBooking();
  const navigate = useNavigate();
  if (isLoading) return <LoadingSpinner>Loading booking details...</LoadingSpinner>;
  // if (!data || error) return <ErrorMessage>Error fetching booking information</ErrorMessage>;
  if (!data || error) return <Empty resource={'booking'} />;
  // if (!data) return <Empty

  const {
    startDate,
    endDate,
    numOfNight,
    id,
    numOfGuests,
    cabinPrice,
    extraPrice,
    totalPrice,
    status,
    hasBreakfast,
    isPaid,
    observations,
    guests,
    cabins,
  } = data;
  const safeStatus = status ?? 'unknown';
  const getStatusIcon = (status) => {
    switch (status) {
      case 'checked-in':
        return <CheckCircle size={16} />;
      case 'checked-out':
        return <CheckCircle size={16} />;
      case 'unconfirmed':
        return <Clock size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getCardAccentColor = (status) => {
    switch (status) {
      case 'unconfirmed':
        return 'linear-gradient(90deg, #3b82f6, #1e40af)';
      case 'checked-in':
        return 'linear-gradient(90deg, #22c55e, #166534)';
      case 'checked-out':
        return 'linear-gradient(90deg, #94a3b8, #64748b)';
      default:
        return 'linear-gradient(90deg, #f59e0b, #d97706)';
    }
  };

  return (
    <Container>
      <MainContent>
        <LeftColumn>
          {/* Guest Information */}
          <Card accentColor="linear-gradient(90deg, #8b5cf6, #7c3aed)">
            <SectionTitle iconColor="#8b5cf6">
              <User size={24} />
              Guest Information
            </SectionTitle>
            <Row>
              <DataItem borderColor="#8b5cf6">
                <Label>Full Name</Label>
                <Value>{guests.fullName}</Value>
              </DataItem>
              <DataItem borderColor="#06b6d4">
                <Label>Email</Label>
                <Value>{guests.email}</Value>
              </DataItem>
              <DataItem borderColor="#10b981">
                <Label>Nationality</Label>
                <Value>{guests.nationality}</Value>
              </DataItem>
              <DataItem borderColor="#f59e0b">
                <Label>National ID</Label>
                <Value>{guests.nationalID}</Value>
              </DataItem>
            </Row>
          </Card>

          {/* Booking Details */}
          <Card accentColor={getCardAccentColor(status)}>
            <SectionTitle iconColor="#3b82f6">
              <Calendar size={24} />
              Booking Details
            </SectionTitle>
            <Row>
              <DataItem borderColor="#3b82f6">
                <Label>Check-in Date</Label>
                <Value>
                  {new Date(startDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Value>
              </DataItem>

              <DataItem borderColor="#8b5cf6">
                <Label>Check-out Date</Label>
                <Value>
                  {new Date(endDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </Value>
              </DataItem>
              <DataItem borderColor="#06b6d4">
                <Label>Duration</Label>
                <Value>
                  {numOfNight} {numOfNight === 1 ? 'night' : 'nights'}
                </Value>
              </DataItem>
              <DataItem borderColor="#10b981">
                <Label>Guests</Label>
                <Value>
                  {numOfGuests} {numOfGuests === 1 ? 'guest' : 'guests'}
                </Value>
              </DataItem>
            </Row>

            <Row style={{ marginTop: '1rem' }}>
              <DataItem
                borderColor={status === 'checked-in' ? '#22c55e' : status === 'checked-out' ? '#94a3b8' : '#3b82f6'}
              >
                <Label>Status</Label>
                <StatusTag status={status}>
                  {getStatusIcon(status)}
                  {status.replace('-', ' ')}
                </StatusTag>
              </DataItem>
              <DataItem borderColor="#f59e0b">
                <Label>Breakfast</Label>
                <PaymentStatus isPaid={hasBreakfast}>
                  {hasBreakfast ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {hasBreakfast ? 'Yes' : 'No'}
                </PaymentStatus>
              </DataItem>
              <DataItem borderColor={isPaid ? '#22c55e' : '#ef4444'}>
                <Label>Payment</Label>
                <PaymentStatus isPaid={isPaid}>
                  {isPaid ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  {isPaid ? 'Paid' : 'Pending'}
                </PaymentStatus>
              </DataItem>
            </Row>

            {observations && (
              <NotesSection>
                <Label style={{ color: '#7c3aed', marginBottom: '0.8rem', display: 'block' }}>Special Notes</Label>
                <Value style={{ color: '#5b21b6', lineHeight: '1.6' }}>{observations}</Value>
              </NotesSection>
            )}
          </Card>
        </LeftColumn>

        <RightColumn>
          {/* Cabin Information */}
          <Card accentColor="linear-gradient(90deg, #059669, #047857)">
            <SectionTitle iconColor="#059669">
              <Home size={24} />
              Cabin Information
            </SectionTitle>
            <CabinWrapper>
              <CabinImage src={cabins.image} alt={cabins.name} />
              <CabinInfo>
                <CabinName>{cabins.name}</CabinName>
                <CabinDetail>
                  <Users size={18} />
                  <span>Capacity: {cabins.maxCapacity} guests</span>
                </CabinDetail>
                <CabinDetail>
                  <CreditCard size={18} />
                  <span>Regular Price: ${cabins.regularPrice}</span>
                </CabinDetail>
                {cabins.discount > 0 && (
                  <CabinDetail>
                    <span style={{ color: '#dc2626', fontWeight: '600' }}>Discount: {cabins.discount}%</span>
                  </CabinDetail>
                )}
              </CabinInfo>
            </CabinWrapper>
          </Card>
          {(safeStatus === 'checked-in' || safeStatus === 'unconfirmed') && (
            <Card accentColor="linear-gradient(90deg, #059669, #047857)">
              {safeStatus === 'checked-in' ? (
                <CheckoutButton bookingId={id} />
              ) : (
                <button onClick={() => navigate(`/checkin/${id}`)}>Check In</button>
              )}
            </Card>
          )}

          {/* Payment Summary */}
          <Card accentColor="linear-gradient(90deg, #059669, #047857)">
            <SectionTitle iconColor="#059669">
              <CreditCard size={24} />
              Payment Summary
            </SectionTitle>
            <PriceBreakdown>
              <PriceRow>
                <PriceLabel>
                  Cabin ({numOfNight} {numOfNight === 1 ? 'night' : 'nights'})
                </PriceLabel>
                <PriceValue>${cabinPrice}</PriceValue>
              </PriceRow>
              <PriceRow>
                <PriceLabel>Extras & Services</PriceLabel>
                <PriceValue>${extraPrice}</PriceValue>
              </PriceRow>
              <PriceRow isTotal>
                <PriceLabel isTotal>Total Amount</PriceLabel>
                <PriceValue isTotal>${totalPrice}</PriceValue>
              </PriceRow>
            </PriceBreakdown>
          </Card>
        </RightColumn>
      </MainContent>
    </Container>
  );
}

export default BookingDetail;

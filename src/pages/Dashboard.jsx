import Heading from '../ui/Heading';
import Row from '../ui/Row';
import DashboardLayout from '../features/dashboard/DashboardLayout';
import DashboardFilter from '../features/dashboard/DashboardFilter';
function Dashboard() {
  return (<>
  
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter/>
      <DashboardLayout />
    <Row type="horizontal">

    </Row>
  
  </>
  );
}

export default Dashboard;

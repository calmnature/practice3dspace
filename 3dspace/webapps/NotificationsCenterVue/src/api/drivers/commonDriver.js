import PAPIDriver from '~/api/drivers/PAPIDriver';
import mockDriver from '~/api/drivers/mockDriver';

const commonDriver = process.env.NODE_ENV === 'production' ? PAPIDriver : mockDriver;

export default commonDriver;

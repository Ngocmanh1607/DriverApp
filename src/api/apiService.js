import axios from 'axios';

const HERE_API_KEY = '7sef-qPLms2vVRE4COs57FGzk4LuYC20NtU6TCd13kU';

const apiService = {
  currentLocation: async (latitude, longitude) => {
    try {
      const response = await axios.get(
        'https://revgeocode.search.hereapi.com/v1/revgeocode',
        {
          params: {
            at: `${latitude},${longitude}`,
            lang: 'en-US',
            apiKey: HERE_API_KEY,
          },
        },
      );

      const data = response.data;
      if (data.items && data.items.length > 0) {
        return {
          latitude,
          longitude,
          address: data.items[0].address.label,
        };
      } else {
        throw new Error('Không thể tìm thấy vị trí');
      }
    } catch (error) {
      console.error('Error fetching current location:', error);
      throw new Error('Không thể tìm thấy vị trí');
    }
  },

  searchAddress: async search => {
    try {
      const response = await axios.get(
        'https://geocode.search.hereapi.com/v1/geocode',
        {
          params: {
            q: search,
            apiKey: HERE_API_KEY,
          },
        },
      );

      const data = response.data;
      if (data.items && data.items.length > 0) {
        const responses = data.items.map(item => ({
          latitude: item.position.lat,
          longitude: item.position.lng,
          address: item.address.label,
        }));
        return responses;
      } else {
        throw new Error('Không tìm thấy địa chỉ nào phù hợp');
      }
    } catch (error) {
      console.log('Error searching address:', error);
      throw new Error('Có lỗi xảy ra khi tìm kiếm địa chỉ');
    }
  },
};

export default apiService;

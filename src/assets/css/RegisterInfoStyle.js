import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  avatarContainer: {
    zIndex: 1,
    backgroundColor: '#FFF',
    width: 120,
    height: 120,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#FF6347',
    borderWidth: 2,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 15,
  },
  infoContainer: {
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: -40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  scanButton: {
    marginTop: 40,
    padding: 10,
  },
  input: {
    marginBottom: 20,
    color: '#666',
    fontSize: 14,
  },
  cccdImageContainer: {
    width: '48%',
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cccdImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cccdPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  vehicleInfo: {
    marginHorizontal: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 100,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

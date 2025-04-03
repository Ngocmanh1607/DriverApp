import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  writeReviewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  ratingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  averageRatingContainer: {
    width: '30%',
    alignItems: 'center',
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
  },
  averageRatingValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  starIcon: {
    marginHorizontal: 1,
  },
  totalReviewsText: {
    fontSize: 14,
    color: '#777777',
  },
  ratingBreakdown: {
    flex: 1,
    paddingLeft: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 30,
    marginRight: 8,
  },
  starText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555555',
    marginRight: 3,
  },
  starIconSmall: {
    marginTop: 1,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    flex: 1,
  },
  countContainer: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'flex-end',
  },
  countText: {
    fontSize: 13,
    color: '#555555',
    marginRight: 4,
  },
  percentageText: {
    fontSize: 13,
    color: '#999999',
  },
  reviewsList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  writeReviewButtonLarge: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
export default styles;

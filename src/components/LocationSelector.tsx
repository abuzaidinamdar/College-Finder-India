import { useState, useEffect } from 'react';

interface LocationSelectorProps {
  onSearch: (location: string) => void;
  loading: boolean;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const MAJOR_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
  'Kolkata', 'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
  'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad',
  'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik',
  'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivali', 'Vasai-Virar',
  'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar', 'Navi Mumbai',
  'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur', 'Gwalior',
  'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
  'Chandigarh', 'Solapur', 'Hubballi-Dharwad', 'Tiruchirappalli', 'Bareilly',
  'Mysore', 'Tiruppur', 'Gurgaon', 'Aligarh', 'Jalandhar', 'Bhubaneswar',
  'Salem', 'Mira-Bhayandar', 'Warangal', 'Guntur', 'Bhiwandi', 'Saharanpur',
  'Gorakhpur', 'Bikaner', 'Amravati', 'Noida', 'Jamshedpur', 'Bhilai',
  'Cuttack', 'Firozabad', 'Kochi', 'Nellore', 'Bhavnagar', 'Dehradun',
  'Durgapur', 'Asansol', 'Rourkela', 'Nanded', 'Kolhapur', 'Ajmer',
  'Akola', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri',
  'Jhansi', 'Ulhasnagar', 'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore',
  'Erode', 'Belgaum', 'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya',
  'Jalgaon', 'Udaipur', 'Maheshtala'
];

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSearch, loading }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchType, setSearchType] = useState<'state' | 'city'>('state');
  const [customLocation, setCustomLocation] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev >= 95 ? 95 : 
            Math.min(prev + (prev < 30 ? 8 : prev < 60 ? 5 : prev < 80 ? 3 : 1), 95);
          return newProgress;
        });
      }, 200);

      return () => {
        clearInterval(interval);
      };
    } else {
      setProgress(100);
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const location = selectedLocation || customLocation;
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const getLocationOptions = () => {
    return searchType === 'state' ? INDIAN_STATES : MAJOR_CITIES;
  };

  return (
    <div className="location-selector">
      <div className="selector-card">
        <h2>Find Colleges in Your Area</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="search-type-toggle">
            <button
              type="button"
              className={`toggle-btn ${searchType === 'state' ? 'active' : ''}`}
              onClick={() => {
                setSearchType('state');
                setSelectedLocation('');
                setCustomLocation('');
              }}
            >
              Search by State
            </button>
            <button
              type="button"
              className={`toggle-btn ${searchType === 'city' ? 'active' : ''}`}
              onClick={() => {
                setSearchType('city');
                setSelectedLocation('');
                setCustomLocation('');
              }}
            >
              Search by City
            </button>
          </div>

          <div className="location-input-group">
            <label htmlFor="location-select">
              Select {searchType === 'state' ? 'State' : 'City'}:
            </label>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setCustomLocation('');
              }}
              className="location-select"
            >
              <option value="">-- Select {searchType === 'state' ? 'State' : 'City'} --</option>
              {getLocationOptions().map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="location-input-group">
            <label htmlFor="custom-location">
              Enter Custom Location:
            </label>
            <input
              type="text"
              id="custom-location"
              value={customLocation}
              onChange={(e) => {
                setCustomLocation(e.target.value);
                setSelectedLocation('');
              }}
              placeholder="Enter area name, city, or state"
              className="location-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading || (!selectedLocation && !customLocation.trim())}
            className={`search-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <div className="loading-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="loading-text">
                  LOADING {Math.round(progress)}%
                </span>
              </div>
            ) : (
              <>
                Find Colleges
              </>
            )}
          </button>
          <h5 className="attribution-text">Made By Abuzaid</h5>
        </form>
      </div>
    </div>
  );
};

export default LocationSelector;

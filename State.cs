namespace GuardianWasm
{
    public class State
    {
        public string _name = string.Empty;
        private readonly string _primaryBrandName = "Wellcare by Allwell";
        private readonly string _secondaryBrandName = string.Empty;
        private readonly string _teriataryBrandName = string.Empty;

        private readonly string _primarySiteLink = string.Empty;
        private readonly string _secondarySiteLink = string.Empty;
        private readonly string _stateInfoLink = string.Empty;

        private readonly bool _ihhaEligible = false;

        public State()
        {

        }
        public State(string name, string primaryBrandName,
                        string  secondaryBrandName, string teriataryBrandName, 
                        string primarySiteLink, string secondarySiteLink, string stateInfoLink, bool ihhaEligible)
        {
            _name = name;
            _primaryBrandName = primaryBrandName;
            _secondaryBrandName = secondaryBrandName;
            _teriataryBrandName = teriataryBrandName;
            _primarySiteLink = primarySiteLink;
            _secondarySiteLink = secondarySiteLink;
            _stateInfoLink = stateInfoLink;
            _ihhaEligible = ihhaEligible;
        }

        public string Name => _name;
        public string PrimaryBrandName => _primaryBrandName;
        public string SecondaryBrandName => _secondaryBrandName;
        public string TeriataryBrandName => _teriataryBrandName;
        public string PrimarySiteLink => _primarySiteLink;
        public string SecondarySiteLink => _secondarySiteLink;
        public string StateInfoLink => _stateInfoLink;
        public bool IhhaEligible => _ihhaEligible;
    }
}

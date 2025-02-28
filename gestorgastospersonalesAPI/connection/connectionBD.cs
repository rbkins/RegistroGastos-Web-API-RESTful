namespace gestorgastospersonalesAPI.connection
{
    public class connectionBD
    {
        private string connectionstring = string.Empty;

       public connectionBD() { 
        
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            connectionstring = builder.GetSection("ConnectionStrings:connection").Value;
        
        }
        public string getconnection() { 
        
            return connectionstring;
        }
    }
}

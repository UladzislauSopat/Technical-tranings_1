using System.Text.Json.Serialization;

namespace sklepAPI.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public List<Product>? Products { get; set; }
    }
}

namespace sklepAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Products { get; set; }

        public int KlientId { get; set; }
        public Klient Klient { get; set; }
        public string Status { get; set; }
    }

    public class CreateOrderDto
    {
        public int ProductId { get; set; }
        public int KlientId { get; set; }
        public string Status { get; set; }
    }

    public class UpdateStatusDto
    {
        public string Status { get; set; }
    }
}

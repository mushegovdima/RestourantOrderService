
using Eat.SDK.Interfaces;

public interface ICategory
{
        public Guid Id { get; set; }
        public long SortOrder { get; set; }
        public string Title { get; set; }
        public bool Hide { get; set; }
        public string? RibbonColor { get; set; }
        public string? RibbonTitle { get; set; }
}
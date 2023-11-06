using Eat.SDK.Interfaces;

namespace Eat.Api.Models
{
    public class Category: IHasTitle, IHasGuidId, ISortable
    {
        public Guid Id { get; set; }
        public long SortOrder { get; set; }
        public required string Title { get; set; }
        public bool Hide { get; set; }
        public string? RibbonColor { get; set; }
        public string? RibbonTitle { get; set; }
    }
}


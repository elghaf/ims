from abc import ABC, abstractmethod
from enum import Enum

class DiscountStrategyType(str, Enum):
    NONE = "none"
    PERCENTAGE = "percentage"

class TaxStrategyType(str, Enum):
    NONE = "none"
    FLAT = "flat"

class PricingStrategy(ABC):
    @abstractmethod
    def calculate(self, price: float) -> float:
        pass
        
    def apply_pricing(self, price: float) -> float:
        """Alias for calculate to maintain backward compatibility"""
        return self.calculate(price)

class NoDiscount(PricingStrategy):
    def calculate(self, price: float) -> float:
        return price

class PercentageDiscount(PricingStrategy):
    def __init__(self, percentage: float):
        self.percentage = percentage
    def calculate(self, price: float) -> float:
        return price * (1 - self.percentage / 100)

class NoTax(PricingStrategy):
    def calculate(self, price: float) -> float:
        return price

class FlatTax(PricingStrategy):
    def __init__(self, tax_rate: float):
        self.tax_rate = tax_rate
    def calculate(self, price: float) -> float:
        return price * (1 + self.tax_rate / 100)

def get_discount_strategy(strategy_type: DiscountStrategyType, percentage: float = 0) -> PricingStrategy:
    if strategy_type == DiscountStrategyType.PERCENTAGE:
        return PercentageDiscount(percentage)
    return NoDiscount()

def get_tax_strategy(strategy_type: TaxStrategyType, tax_rate: float = 0) -> PricingStrategy:
    if strategy_type == TaxStrategyType.FLAT:
        return FlatTax(tax_rate)
    return NoTax()
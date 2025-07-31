FactoryBot.define do
  factory :journal do
    title { "MyString" }
    content { "MyText" }
    user { nil }
  end
end

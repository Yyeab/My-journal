class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :tag_name
      t.references :journal, null: false, foreign_key: true

      t.timestamps
    end
  end
end

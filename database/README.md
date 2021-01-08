# Database architecture

> #### Products table
| Column Name   | Data Type     | Not Null |  PK  |
|---------------|---------------|:--------:|:----:|
| id            | int(11)       |   ✓      | ✓   |
| name          | varchar(20)   |   ✓      | ✖   |
| group         | enum          |   ✓      | ✖   |
| catagory      | enum          |   ✓      | ✖   |
| price         | float         |   ✓      | ✖   |
| price_without_discount|float  |   ✖      | ✖   |
| count         | smallint(4)   |   ✓      | ✖   |
| availability  | enum          |   ✓      | ✖   |
| review        | smallint(4)   |   ✓      | ✖   |
| short_description| varchar(255)|  ✓      | ✖   |
| long_description| varchar(255)|   ✓      | ✖   |
| image_url     | varchar(255)  |   ✓      | ✖   |

> #### Users table
| Column Name   | Data Type     | Not Null |  PK  |
|---------------|---------------|:--------:|:----:|
| id            | varchar(50)   |   ✓      | ✓   |
| username      | varchar(50)   |   ✓      | ✖   |
| email         | varchar(50)   |   ✓      | ✓   |
| password      | varchar(50)   |   ✓      | ✖   |

> #### Recently viewed table
| Column Name   | Data Type     | Not Null |  PK  |
|---------------|---------------|:--------:|:----:|
| user_id       | varchar(50)   |   ✓      | ✓   |
| product_id    | int(11)       |   ✓      | ✓   |
| last_seen     | timestamp     |   ✓      | ✖   |

> #### Cart table
| Column Name   | Data Type     | Not Null |  PK  |
|---------------|---------------|:--------:|:----:|
| user_id       | varchar(50)   |   ✓      | ✓   |
| product_id    | int(11)       |   ✓      | ✓   |
| product_count | tinyint(4)    |   ✓      | ✖   |

> #### Wishlist table
| Column Name   | Data Type     | Not Null |  PK  |
|---------------|---------------|:--------:|:----:|
| user_id       | varchar(50)   |   ✓      | ✓   |
| product_id    | int(11)       |   ✓      | ✓   |
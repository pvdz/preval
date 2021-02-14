# Preval test case

# computed_prop.md

> expr_order > computed_prop
>
> The object is evaluated before the computed property

#TODO

## Input

`````js filename=intro
$(1)[$(2)];
`````

## Normalized

`````js filename=intro
const tmpCompObj = $(1);
const tmpCompProp = $(2);
tmpCompObj[tmpCompProp];
`````

## Output

`````js filename=intro
const tmpCompObj = $(1);
const tmpCompProp = $(2);
tmpCompObj[tmpCompProp];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

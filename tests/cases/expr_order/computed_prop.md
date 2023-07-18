# Preval test case

# computed_prop.md

> Expr order > Computed prop
>
> The object is evaluated before the computed property

#TODO

## Input

`````js filename=intro
$(1)[$(2)];
`````

## Pre Normal

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

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
a[ b ];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

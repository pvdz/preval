# Preval test case

# isarray_with_unknown.md

> Array > Static context > Isarray with unknown
>
> Array.isArray check

#TODO

## Input

`````js filename=intro
$(Array.isArray([$(1),$(2),$(3)]));
`````

## Pre Normal

`````js filename=intro
$(Array.isArray([$(1), $(2), $(3)]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = $(2);
const tmpArrElement$3 = $(3);
const tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
const tmpCalleeParam = Array.isArray(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(3);
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

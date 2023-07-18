# Preval test case

# auto_ident_cond_simple_complex_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident cond simple complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = 1 ? $(2) : $($(100)));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = 1 ? $(2) : $($(100)));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(2);
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = $(2);
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

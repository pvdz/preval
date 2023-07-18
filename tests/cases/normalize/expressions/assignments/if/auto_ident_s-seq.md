# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > If > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
if ((a = ($(1), $(2), x)));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
if ((a = ($(1), $(2), x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = x;
let tmpIfTest = a;
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

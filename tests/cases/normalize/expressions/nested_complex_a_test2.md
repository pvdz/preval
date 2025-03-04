# Preval test case

# nested_complex_a_test2.md

> Normalize > Expressions > Nested complex a test2
>
> Nested assignments should be split up

## Input

`````js filename=intro
let a = $([]), b;
$($(a).length);
//$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````

## Pre Normal


`````js filename=intro
let a = $([]),
  b;
$($(a).length);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [];
let a = tmpCallCallee(tmpCalleeParam);
let b = undefined;
const tmpCallCallee$1 = $;
const tmpCompObj = $(a);
const tmpCalleeParam$1 = tmpCompObj.length;
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpCompObj /*:unknown*/ = $(a);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj.length;
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
const d = c.length;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: []
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident new prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = new b.$(1))]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$({ [(a = new b.$(1))]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
const tmpCalleeParam /*:object*/ = { [tmpClusterSSA_a]: 10 };
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
const b = { [ a ]: 10 };
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { '[object Object]': '10' }
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

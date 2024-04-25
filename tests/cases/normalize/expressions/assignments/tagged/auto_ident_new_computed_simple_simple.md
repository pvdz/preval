# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new b["$"](1))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = new b[`\$`](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpSSA_a = new $(1);
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, tmpSSA_a);
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
const b = [ "before ", " after" ];
$( b, a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

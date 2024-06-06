# Preval test case

# auto_ident_new_prop_s-seq.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident new prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = new (1, 2, b).$(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = new (1, 2, b).$(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpNestedComplexRhs = new $(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  const d = new $( 1 );
  a = d;
  $( d );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

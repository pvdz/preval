# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b)["$"](1)) || (a = new (1, 2, b)["$"](1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new (1, 2, b)[`\$`](1)) || (a = new (1, 2, b)[`\$`](1)));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCompObj$1 = b;
  const tmpNewCallee$1 = tmpCompObj$1.$;
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let tmpSSA_a = new $(1);
let tmpCalleeParam = tmpSSA_a;
if (tmpSSA_a) {
  $(tmpCalleeParam);
} else {
  const tmpNestedComplexRhs = new $(1);
  tmpSSA_a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = new $( 1 );
let b = a;
if (a) {
  $( b );
}
else {
  const c = new $( 1 );
  a = c;
  b = c;
  $( c );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

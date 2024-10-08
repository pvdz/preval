# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident new computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = new (1, 2, b)["$"](1));
}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = new (1, 2, b)[`\$`](1));
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCompObj = b;
  const tmpNewCallee = tmpCompObj.$;
  a = new tmpNewCallee(1);
  return a;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a /*:object*/ = new $(1);
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
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

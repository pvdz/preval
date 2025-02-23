# Preval test case

# param_vars_in_func_expr.md

> Binding > Param vars in func expr
>
> Param that also has a var in same scope. Prettier (minified) does this.

## Input

`````js filename=intro
const f = function(a) {
  var a = $(10), b = $(20);
  return [a, b];
}
$(f());
`````

## Pre Normal


`````js filename=intro
const f = function ($$0) {
  let a = $$0;
  debugger;
  let b = undefined;
  (a = $(10)), (b = $(20));
  return [a, b];
};
$(f());
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  let a = $$0;
  debugger;
  let b = undefined;
  a = $(10);
  b = $(20);
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_a /*:unknown*/ = $(10);
const b /*:unknown*/ = $(20);
const tmpReturnArg /*:array*/ = [tmpClusterSSA_a, b];
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( 20 );
const c = [ a, b ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [10, 20]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

# Preval test case

# member_expr_call_complex_arg_getter_proof.md

> Expr order > Member expr call complex arg getter proof
>
> Spread should normalize itself

This should throw. There was a regression where `a.b` was read before `x.y` (but the evaluation order ought to read `x.y` first)

This case proofs it with a getter.

#TODO

## Input

`````js filename=intro
var a = {
  get b() {
    $('b.get');
    return 100;
  },
};
var x = {
  get y() {
    $('y.get');
    return $;
  },
};
x.y(a.b);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let x = undefined;
a = {
  get b() {
    debugger;
    $(`b.get`);
    return 100;
  },
};
x = {
  get y() {
    debugger;
    $(`y.get`);
    return $;
  },
};
x.y(a.b);
`````

## Normalized

`````js filename=intro
let a = undefined;
let x = undefined;
a = {
  get b() {
    debugger;
    $(`b.get`);
    return 100;
  },
};
x = {
  get y() {
    debugger;
    $(`y.get`);
    return $;
  },
};
const tmpCallObj = x;
const tmpCallVal = tmpCallObj.y;
const tmpCalleeParam = a.b;
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {
  get b() {
    debugger;
    $(`b.get`);
    return 100;
  },
};
const x = {
  get y() {
    debugger;
    $(`y.get`);
    return $;
  },
};
const tmpCallVal = x.y;
const tmpCalleeParam = a.b;
$dotCall(tmpCallVal, x, tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y.get'
 - 2: 'b.get'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

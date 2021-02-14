# Preval test case

# call_arg.md

> normalize > spread > call_arg
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

## Normalized

`````js filename=intro
var a;
var x;
a = {
  get b() {
    $('b.get');
    return 100;
  },
};
x = {
  get y() {
    $('y.get');
    return $;
  },
};
const tmpCallObj = x;
const tmpCallVal = tmpCallObj.y;
const tmpCalleeParam = a.b;
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Output

`````js filename=intro
var a;
var x;
a = {
  get b() {
    $('b.get');
    return 100;
  },
};
x = {
  get y() {
    $('y.get');
    return $;
  },
};
const tmpCallObj = x;
const tmpCallVal = tmpCallObj.y;
const tmpCalleeParam = a.b;
tmpCallVal.call(tmpCallObj, tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y.get'
 - 2: 'b.get'
 - 3: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same

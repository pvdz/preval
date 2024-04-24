# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Return > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (10, 20, $(30)) ? $(2) : $($(100));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (10, 20, $(30)) ? $(2) : $($(100));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    tmpReturnArg = $(2);
    return tmpReturnArg;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    tmpReturnArg = $(2);
    return tmpReturnArg;
  } else {
    const tmpCalleeParam = $(100);
    tmpReturnArg = $(tmpCalleeParam);
    return tmpReturnArg;
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = undefined;
  const c = $( 30 );
  if (c) {
    b = $( 2 );
    return b;
  }
  else {
    const d = $( 100 );
    b = $( d );
    return b;
  }
};
const e = a();
$( e );
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

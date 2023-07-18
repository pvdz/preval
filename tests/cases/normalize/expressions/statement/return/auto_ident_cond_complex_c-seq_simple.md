# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $(1) ? (40, 50, $(60)) : $($(100));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $(1) ? (40, 50, $(60)) : $($(100));
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpReturnArg = $(60);
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpClusterSSA_tmpReturnArg = $(60);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpCalleeParam = $(100);
    const tmpClusterSSA_tmpReturnArg$1 = $(tmpCalleeParam);
    return tmpClusterSSA_tmpReturnArg$1;
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
  const b = $( 1 );
  if (b) {
    const c = $( 60 );
    return c;
  }
  else {
    const d = $( 100 );
    const e = $( d );
    return e;
  }
},;
const f = a();
$( f );
const g = {
a: 999,
b: 1000
;
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

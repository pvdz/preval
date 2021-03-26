# Preval test case

# transitivity.md

> Primitive arg inlining > Transitivity
>
> Trying to proc the cloning cache

#TODO

## Input

`````js filename=intro
function f(a, b) {
  return $(a, b);
}
$(f('a', $('b')), 'first A');
$(f($('a'), 'b'), 'first B');
$(f($('a'), $('b')), 'first C');
$(f('a', 'b'), 'first D');
$(f('a', $('b')), 'second A');
$(f($('a'), 'b'), 'second B');
$(f($('a'), $('b')), 'second C');
$(f('a', 'b'), 'second D');
`````

## Pre Normal

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return $(a, b);
};
$(f('a', $('b')), 'first A');
$(f($('a'), 'b'), 'first B');
$(f($('a'), $('b')), 'first C');
$(f('a', 'b'), 'first D');
$(f('a', $('b')), 'second A');
$(f($('a'), 'b'), 'second B');
$(f($('a'), $('b')), 'second C');
$(f('a', 'b'), 'second D');
`````

## Normalized

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  const tmpReturnArg = $(a, b);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$3 = 'a';
const tmpCalleeParam$5 = $('b');
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCalleeParam$1 = 'first A';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$11 = $('a');
const tmpCalleeParam$13 = 'b';
const tmpCalleeParam$7 = tmpCallCallee$5(tmpCalleeParam$11, tmpCalleeParam$13);
const tmpCalleeParam$9 = 'first B';
tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpCalleeParam$19 = $('a');
const tmpCalleeParam$21 = $('b');
const tmpCalleeParam$15 = tmpCallCallee$9(tmpCalleeParam$19, tmpCalleeParam$21);
const tmpCalleeParam$17 = 'first C';
tmpCallCallee$7(tmpCalleeParam$15, tmpCalleeParam$17);
const tmpCallCallee$11 = $;
const tmpCalleeParam$23 = f('a', 'b');
const tmpCalleeParam$25 = 'first D';
tmpCallCallee$11(tmpCalleeParam$23, tmpCalleeParam$25);
const tmpCallCallee$13 = $;
const tmpCallCallee$15 = f;
const tmpCalleeParam$31 = 'a';
const tmpCalleeParam$33 = $('b');
const tmpCalleeParam$27 = tmpCallCallee$15(tmpCalleeParam$31, tmpCalleeParam$33);
const tmpCalleeParam$29 = 'second A';
tmpCallCallee$13(tmpCalleeParam$27, tmpCalleeParam$29);
const tmpCallCallee$17 = $;
const tmpCallCallee$19 = f;
const tmpCalleeParam$39 = $('a');
const tmpCalleeParam$41 = 'b';
const tmpCalleeParam$35 = tmpCallCallee$19(tmpCalleeParam$39, tmpCalleeParam$41);
const tmpCalleeParam$37 = 'second B';
tmpCallCallee$17(tmpCalleeParam$35, tmpCalleeParam$37);
const tmpCallCallee$21 = $;
const tmpCallCallee$23 = f;
const tmpCalleeParam$47 = $('a');
const tmpCalleeParam$49 = $('b');
const tmpCalleeParam$43 = tmpCallCallee$23(tmpCalleeParam$47, tmpCalleeParam$49);
const tmpCalleeParam$45 = 'second C';
tmpCallCallee$21(tmpCalleeParam$43, tmpCalleeParam$45);
const tmpCallCallee$25 = $;
const tmpCalleeParam$51 = f('a', 'b');
const tmpCalleeParam$53 = 'second D';
tmpCallCallee$25(tmpCalleeParam$51, tmpCalleeParam$53);
`````

## Output

`````js filename=intro
const tmpCalleeParam$5 = $('b');
const tmpCalleeParam = $('a', tmpCalleeParam$5);
$(tmpCalleeParam, 'first A');
const tmpCalleeParam$11 = $('a');
const tmpCalleeParam$7 = $(tmpCalleeParam$11, 'b');
$(tmpCalleeParam$7, 'first B');
const tmpCalleeParam$19 = $('a');
const tmpCalleeParam$21 = $('b');
const tmpCalleeParam$15 = $(tmpCalleeParam$19, tmpCalleeParam$21);
$(tmpCalleeParam$15, 'first C');
const tmpCalleeParam$23 = $('a', 'b');
$(tmpCalleeParam$23, 'first D');
const tmpCalleeParam$33 = $('b');
const tmpCalleeParam$27 = $('a', tmpCalleeParam$33);
$(tmpCalleeParam$27, 'second A');
const tmpCalleeParam$39 = $('a');
const tmpCalleeParam$35 = $(tmpCalleeParam$39, 'b');
$(tmpCalleeParam$35, 'second B');
const tmpCalleeParam$47 = $('a');
const tmpCalleeParam$49 = $('b');
const tmpCalleeParam$43 = $(tmpCalleeParam$47, tmpCalleeParam$49);
$(tmpCalleeParam$43, 'second C');
const tmpCalleeParam$51 = $('a', 'b');
$(tmpCalleeParam$51, 'second D');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'a', 'b'
 - 3: 'a', 'first A'
 - 4: 'a'
 - 5: 'a', 'b'
 - 6: 'a', 'first B'
 - 7: 'a'
 - 8: 'b'
 - 9: 'a', 'b'
 - 10: 'a', 'first C'
 - 11: 'a', 'b'
 - 12: 'a', 'first D'
 - 13: 'b'
 - 14: 'a', 'b'
 - 15: 'a', 'second A'
 - 16: 'a'
 - 17: 'a', 'b'
 - 18: 'a', 'second B'
 - 19: 'a'
 - 20: 'b'
 - 21: 'a', 'b'
 - 22: 'a', 'second C'
 - 23: 'a', 'b'
 - 24: 'a', 'second D'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

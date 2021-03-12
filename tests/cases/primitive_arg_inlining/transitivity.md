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

## Normalized

`````js filename=intro
let f = function (a, b) {
  const tmpReturnArg = $(a, b);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$2 = 'a';
const tmpCalleeParam$3 = $('b');
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$3);
const tmpCalleeParam$1 = 'first A';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$6 = $('a');
const tmpCalleeParam$7 = 'b';
const tmpCalleeParam$4 = tmpCallCallee$3(tmpCalleeParam$6, tmpCalleeParam$7);
const tmpCalleeParam$5 = 'first B';
tmpCallCallee$2(tmpCalleeParam$4, tmpCalleeParam$5);
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$10 = $('a');
const tmpCalleeParam$11 = $('b');
const tmpCalleeParam$8 = tmpCallCallee$5(tmpCalleeParam$10, tmpCalleeParam$11);
const tmpCalleeParam$9 = 'first C';
tmpCallCallee$4(tmpCalleeParam$8, tmpCalleeParam$9);
const tmpCallCallee$6 = $;
const tmpCalleeParam$12 = f('a', 'b');
const tmpCalleeParam$13 = 'first D';
tmpCallCallee$6(tmpCalleeParam$12, tmpCalleeParam$13);
const tmpCallCallee$7 = $;
const tmpCallCallee$8 = f;
const tmpCalleeParam$16 = 'a';
const tmpCalleeParam$17 = $('b');
const tmpCalleeParam$14 = tmpCallCallee$8(tmpCalleeParam$16, tmpCalleeParam$17);
const tmpCalleeParam$15 = 'second A';
tmpCallCallee$7(tmpCalleeParam$14, tmpCalleeParam$15);
const tmpCallCallee$9 = $;
const tmpCallCallee$10 = f;
const tmpCalleeParam$20 = $('a');
const tmpCalleeParam$21 = 'b';
const tmpCalleeParam$18 = tmpCallCallee$10(tmpCalleeParam$20, tmpCalleeParam$21);
const tmpCalleeParam$19 = 'second B';
tmpCallCallee$9(tmpCalleeParam$18, tmpCalleeParam$19);
const tmpCallCallee$11 = $;
const tmpCallCallee$12 = f;
const tmpCalleeParam$24 = $('a');
const tmpCalleeParam$25 = $('b');
const tmpCalleeParam$22 = tmpCallCallee$12(tmpCalleeParam$24, tmpCalleeParam$25);
const tmpCalleeParam$23 = 'second C';
tmpCallCallee$11(tmpCalleeParam$22, tmpCalleeParam$23);
const tmpCallCallee$13 = $;
const tmpCalleeParam$26 = f('a', 'b');
const tmpCalleeParam$27 = 'second D';
tmpCallCallee$13(tmpCalleeParam$26, tmpCalleeParam$27);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = $('b');
const tmpCalleeParam = $('a', tmpCalleeParam$3);
$(tmpCalleeParam, 'first A');
const tmpCalleeParam$6 = $('a');
const tmpCalleeParam$4 = $(tmpCalleeParam$6, 'b');
$(tmpCalleeParam$4, 'first B');
const tmpCalleeParam$10 = $('a');
const tmpCalleeParam$11 = $('b');
const tmpCalleeParam$8 = $(tmpCalleeParam$10, tmpCalleeParam$11);
$(tmpCalleeParam$8, 'first C');
const tmpCalleeParam$12 = $('a', 'b');
$(tmpCalleeParam$12, 'first D');
const tmpCalleeParam$17 = $('b');
const tmpCalleeParam$14 = $('a', tmpCalleeParam$17);
$(tmpCalleeParam$14, 'second A');
const tmpCalleeParam$20 = $('a');
const tmpCalleeParam$18 = $(tmpCalleeParam$20, 'b');
$(tmpCalleeParam$18, 'second B');
const tmpCalleeParam$24 = $('a');
const tmpCalleeParam$25 = $('b');
const tmpCalleeParam$22 = $(tmpCalleeParam$24, tmpCalleeParam$25);
$(tmpCalleeParam$22, 'second C');
const tmpCalleeParam$26 = $('a', 'b');
$(tmpCalleeParam$26, 'second D');
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

Normalized calls: Same

Final output calls: Same

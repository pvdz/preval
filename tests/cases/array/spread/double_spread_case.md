# Preval test case

# double_spread_case.md

> Array > Spread > Double spread case
>
> Spreading an array into another array that is assigned to a binding

A double spread has the danger of the first case messing with indexes for the second case.

The spreads must be resolved in a first step, back to front, and injections should happen in a second step, also back to front.

#TODO

## Input

`````js filename=intro
let a = $('x')
let b = $('y')
const x = [a, a, a, a, 2, 3];
a = $('u')
b = $('w')
const y = [1, b, a, a, b, 3];
a = $('o')
b = $('p')
const aa = ['a', ...x, ...y, 'a'];
const zz = ['z', ...y, ...x, 'z'];
$(aa, zz, a, b);
`````

## Pre Normal

`````js filename=intro
let a = $(`x`);
let b = $(`y`);
const x = [a, a, a, a, 2, 3];
a = $(`u`);
b = $(`w`);
const y = [1, b, a, a, b, 3];
a = $(`o`);
b = $(`p`);
const aa = [`a`, ...x, ...y, `a`];
const zz = [`z`, ...y, ...x, `z`];
$(aa, zz, a, b);
`````

## Normalized

`````js filename=intro
let a = $(`x`);
let b = $(`y`);
const x = [a, a, a, a, 2, 3];
a = $(`u`);
b = $(`w`);
const y = [1, b, a, a, b, 3];
a = $(`o`);
b = $(`p`);
const aa = [`a`, ...x, ...y, `a`];
const zz = [`z`, ...y, ...x, `z`];
$(aa, zz, a, b);
`````

## Output

`````js filename=intro
let a = $(`x`);
$(`y`);
const arrEl$15 = a;
a = $(`u`);
let b = $(`w`);
const arrEl$23 = b;
const arrEl$25 = a;
a = $(`o`);
b = $(`p`);
const aa = [`a`, arrEl$15, arrEl$15, arrEl$15, arrEl$15, 2, 3, 1, arrEl$23, arrEl$25, arrEl$25, arrEl$23, 3, `a`];
const zz = [`z`, 1, arrEl$23, arrEl$25, arrEl$25, arrEl$23, 3, arrEl$15, arrEl$15, arrEl$15, arrEl$15, 2, 3, `z`];
$(aa, zz, a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( "x" );
$( "y" );
const b = a;
a = $( "u" );
let c = $( "w" );
const d = c;
const e = a;
a = $( "o" );
c = $( "p" );
const f = [ "a", b, b, b, b, 2, 3, 1, d, e, e, d, 3, "a",, ];
const g = [ "z", 1, d, e, e, d, 3, b, b, b, b, 2, 3, "z",, ];
$( f, g, a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'y'
 - 3: 'u'
 - 4: 'w'
 - 5: 'o'
 - 6: 'p'
 - 7: ['a', 'x', 'x', 'x', 'x', 2, 3, 1, 'w', 'u', 'u', 'w', 3, 'a'], ['z', 1, 'w', 'u', 'u', 'w', 3, 'x', 'x', 'x', 'x', 2, 3, 'z'], 'o', 'p'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

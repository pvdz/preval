# Preval test case

# decode_loop.md

> Free > Free loops > Decode loop

Surely we can resolve this at compile time.

## Input

`````js filename=intro
let counter = 0;
const arr = [];
while (true) {
  if (counter < `lrlatnuoMv_yLotebgsaAihuhrL%nmBA%lopFbttitarsecieeLdEcsGgnlodeinmeoyn`.length) {
    const tmpAssignComputedProp = counter;
    const tmpAssignComputedRhs = `lrlatnuoMv_yLotebgsaAihuhrL%nmBA%lopFbttitarsecieeLdEcsGgnlodeinmeoyn`.charAt(counter);
    arr[tmpAssignComputedProp] = tmpAssignComputedRhs;
    counter = counter + 1;
  } else {
    break;
  }
}
$(arr);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [
  `l`,
  `r`,
  `l`,
  `a`,
  `t`,
  `n`,
  `u`,
  `o`,
  `M`,
  `v`,
  `_`,
  `y`,
  `L`,
  `o`,
  `t`,
  `e`,
  `b`,
  `g`,
  `s`,
  `a`,
  `A`,
  `i`,
  `h`,
  `u`,
  `h`,
  `r`,
  `L`,
  `%`,
  `n`,
  `m`,
  `B`,
  `A`,
  `%`,
  `l`,
  `o`,
  `p`,
  `F`,
  `b`,
  `t`,
  `t`,
  `i`,
  `t`,
  `a`,
  `r`,
  `s`,
  `e`,
  `c`,
  `i`,
  `e`,
  `e`,
  `L`,
  `d`,
  `E`,
  `c`,
  `s`,
  `G`,
  `g`,
  `n`,
  `l`,
  `o`,
  `d`,
  `e`,
  `i`,
  `n`,
  `m`,
  `e`,
  `o`,
  `y`,
  `n`,
];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([
  `l`,
  `r`,
  `l`,
  `a`,
  `t`,
  `n`,
  `u`,
  `o`,
  `M`,
  `v`,
  `_`,
  `y`,
  `L`,
  `o`,
  `t`,
  `e`,
  `b`,
  `g`,
  `s`,
  `a`,
  `A`,
  `i`,
  `h`,
  `u`,
  `h`,
  `r`,
  `L`,
  `%`,
  `n`,
  `m`,
  `B`,
  `A`,
  `%`,
  `l`,
  `o`,
  `p`,
  `F`,
  `b`,
  `t`,
  `t`,
  `i`,
  `t`,
  `a`,
  `r`,
  `s`,
  `e`,
  `c`,
  `i`,
  `e`,
  `e`,
  `L`,
  `d`,
  `E`,
  `c`,
  `s`,
  `G`,
  `g`,
  `n`,
  `l`,
  `o`,
  `d`,
  `e`,
  `i`,
  `n`,
  `m`,
  `e`,
  `o`,
  `y`,
  `n`,
]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "l", "r", "l", "a", "t", "n", "u", "o", "M", "v", "_", "y", "L", "o", "t", "e", "b", "g", "s", "a", "A", "i", "h", "u", "h", "r", "L", "%", "n", "m", "B", "A", "%", "l", "o", "p", "F", "b", "t", "t", "i", "t", "a", "r", "s", "e", "c", "i", "e", "e", "L", "d", "E", "c", "s", "G", "g", "n", "l", "o", "d", "e", "i", "n", "m", "e", "o", "y", "n" ];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  [
    'l',
    'r',
    'l',
    'a',
    't',
    'n',
    'u',
    'o',
    'M',
    'v',
    '_',
    'y',
    'L',
    'o',
    't',
    'e',
    'b',
    'g',
    's',
    'a',
    'A',
    'i',
    'h',
    'u',
    'h',
    'r',
    'L',
    '%',
    'n',
    'm',
    'B',
    'A',
    '%',
    'l',
    'o',
    'p',
    'F',
    'b',
    't',
    't',
    'i',
    't',
    'a',
    'r',
    's',
    'e',
    'c',
    'i',
    'e',
    'e',
    'L',
    'd',
    'E',
    'c',
    's',
    'G',
    'g',
    'n',
    'l',
    'o',
    'd',
    'e',
    'i',
    'n',
    'm',
    'e',
    'o',
    'y',
    'n',
  ],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

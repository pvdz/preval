# Preval test case

# oneper_before4.md

> Normalize > Branching > Single branching > Oneper before4
>
> One branch per func?

This is the example input

The test is what that would roughly translate to for single branching functions

## Input

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 'no';
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        } else {
        }
      }
    }
    const l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      const tmpSSA_l = n - 1;
      $(a, b, c, d, e, f, g, h, i, tmpSSA_l, m);
      return undefined;
    } else {
      return undefined;
    }
  }
};
X('a', 'b', 'c', 'd', 'e');
`````


## Settled


`````js filename=intro
$(`a`, `b`, `no`, `c`, `e`, 1, false, `string`, true, 0, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`, `b`, `no`, `c`, `e`, 1, false, `string`, true, 0, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a", "b", "no", "c", "e", 1, false, "string", true, 0, true );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

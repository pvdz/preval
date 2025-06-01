# Preval test case

# loop_continue_callback.md

> Let aliases > Ai > Loop continue callback
>
> Mutation in a loop with continue and callback (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
for (let i = 0; i < 3; i++) {
  if (i === 0) continue;
  [1].forEach(() => { x = "changed"; });
  break;
}
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
let i /*:number*/ = 0;
while (true) {
  const tmpIfTest /*:boolean*/ = i < 3;
  if (tmpIfTest) {
    const tmpIfTest$1 /*:boolean*/ = i === 0;
    if (tmpIfTest$1) {
      i = i + 1;
    } else {
      const tmpMCP /*:()=>undefined*/ = function () {
        debugger;
        x = `changed`;
        return undefined;
      };
      const tmpMCOO /*:array*/ = [1];
      $dotCall($array_forEach, tmpMCOO, `forEach`, tmpMCP);
      break;
    }
  } else {
    break;
  }
}
$(a, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(`val`);
const a = x;
let i = 0;
while (true) {
  if (i < 3) {
    if (i === 0) {
      i = i + 1;
    } else {
      const tmpMCP = function () {
        x = `changed`;
      };
      $dotCall($array_forEach, [1], `forEach`, tmpMCP);
      break;
    }
  } else {
    break;
  }
}
$(a, x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "val" );
const b = a;
let c = 0;
while (true) {
  const d = c < 3;
  if (d) {
    const e = c === 0;
    if (e) {
      c = c + 1;
    }
    else {
      const f = function() {
        debugger;
        a = "changed";
        return undefined;
      };
      const g = [ 1 ];
      $dotCall( $array_forEach, g, "forEach", f );
      break;
    }
  }
  else {
    break;
  }
}
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
let i = 0;
while (true) {
  const tmpIfTest = i < 3;
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = i === 0;
      if (tmpIfTest$1) {
        break $continue;
      } else {
        const tmpMCOO = [1];
        const tmpMCF = tmpMCOO.forEach;
        const tmpMCP = function () {
          debugger;
          x = `changed`;
          return undefined;
        };
        $dotCall(tmpMCF, tmpMCOO, `forEach`, tmpMCP);
        break;
      }
    }
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
  } else {
    break;
  }
}
const b = x;
$(a, x);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this node type in isFree: LabeledStatement
- (todo) arr mutation may be able to inline this method: $array_forEach
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

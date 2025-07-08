# Preval test case

# state_machine_obfuscate.md

> Ai > Ai5 > State machine obfuscate
>
> Test complex state machine with error handling and multiple exit points

## Input

`````js filename=intro
const x = $("start");
let state = 0;
let result = 0;

while (true) {
    try {
        if (state === 0) {
            if (x === "start") {
                state = 1;
                continue;
            }
            break;
        }
        if (state === 1) {
            if (x === "start") {
                state = 2;
                continue;
            }
            if (x === "error") {
                throw new Error("Invalid state");
            }
            break;
        }
        if (state === 2) {
            if (x === "start") {
                result = 1;
                break;
            }
            if (x === "error") {
                throw new Error("Invalid state");
            }
            break;
        }
        break;
    } catch (e) {
        result = -1;
        break;
    }
}

$(result);

// Expected:
// const x = $("start");
// let state = 0;
// let result = 0;
// while (true) {
//     try {
//         if (state === 0) {
//             if (x === "start") {
//                 state = 1;
//                 continue;
//             }
//             break;
//         }
//         if (state === 1) {
//             if (x === "start") {
//                 state = 2;
//                 continue;
//             }
//             if (x === "error") {
//                 throw new Error("Invalid state");
//             }
//             break;
//         }
//         if (state === 2) {
//             if (x === "start") {
//                 result = 1;
//                 break;
//             }
//             if (x === "error") {
//                 throw new Error("Invalid state");
//             }
//             break;
//         }
//         break;
//     } catch (e) {
//         result = -1;
//         break;
//     }
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`start`);
const tmpIfTest$1 /*:boolean*/ = x === `start`;
if (tmpIfTest$1) {
  $(1);
} else {
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`start`) === `start`) {
  $(1);
} else {
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "start" );
const b = a === "start";
if (b) {
  $( 1 );
}
else {
  $( 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`start`);
let state = 0;
let result = 0;
while (true) {
  $continue: {
    try {
      const tmpIfTest = state === 0;
      if (tmpIfTest) {
        const tmpIfTest$1 = x === `start`;
        if (tmpIfTest$1) {
          state = 1;
          break $continue;
        } else {
          break;
        }
      } else {
        const tmpIfTest$3 = state === 1;
        if (tmpIfTest$3) {
          const tmpIfTest$5 = x === `start`;
          if (tmpIfTest$5) {
            state = 2;
            break $continue;
          } else {
            const tmpIfTest$7 = x === `error`;
            if (tmpIfTest$7) {
              const tmpThrowArg = new $error_constructor(`Invalid state`);
              throw tmpThrowArg;
            } else {
              break;
            }
          }
        } else {
          const tmpIfTest$9 = state === 2;
          if (tmpIfTest$9) {
            const tmpIfTest$11 = x === `start`;
            if (tmpIfTest$11) {
              result = 1;
              break;
            } else {
              const tmpIfTest$13 = x === `error`;
              if (tmpIfTest$13) {
                const tmpThrowArg$1 = new $error_constructor(`Invalid state`);
                throw tmpThrowArg$1;
              } else {
                break;
              }
            }
          } else {
            break;
          }
        }
      }
    } catch (e) {
      result = -1;
      break;
    }
  }
}
$(result);
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement
- (todo) Support this node type in isFree: NewExpression
- (todo) can try-escaping support this expr node type? Literal
- (todo) can try-escaping support this expr node type? NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'start'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

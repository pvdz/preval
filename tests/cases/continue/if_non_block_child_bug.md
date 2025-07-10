# Preval test case

# if_non_block_child_bug.md

> Continue > If non block child bug
>
> This particular case tripped up. The label would b0rk.

## Input

`````js filename=intro
if (x)
  end:
    try {
      switch (x) {
        case 1:
          break end;
      }
    } finally {
    }
`````


## Settled


`````js filename=intro
x;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x;
`````


## PST Settled
With rename=true

`````js filename=intro
x;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if (x) {
  end: {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    const tmpSwitchDisc = x;
    const tmpIfTest = tmpSwitchDisc === 1;
    if (tmpIfTest) {
      break end;
    } else {
      if ($implicitThrow) {
        throw $finalCatchArg;
      } else {
      }
    }
  }
} else {
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

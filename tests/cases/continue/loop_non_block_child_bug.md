# Preval test case

# loop_non_block_child_bug.md

> Continue > Loop non block child bug
>
> This particular case tripped up. The label would b0rk.

It would end up something like this and then (due to internal state), fail.

for (;;) {
  $continue: { 
    try { 
      tmpSwitchBreak: {
        const tmpSwitchDisc = x;
        if (tmpSwitchDisc === 1) {
          break $continue;
        } else {  }
      }
    } finally {  }
  }
}

## Input

`````js filename=intro
for (;;)
  try {
    switch (x) {
      case 1:
        continue;
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
while (true) {
  $continue: {
    let $implicitThrow = false;
    let $finalCatchArg = undefined;
    const tmpSwitchDisc = x;
    const tmpIfTest = tmpSwitchDisc === 1;
    if (tmpIfTest) {
      break $continue;
    } else {
      if ($implicitThrow) {
        throw $finalCatchArg;
      } else {
      }
    }
  }
}
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


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

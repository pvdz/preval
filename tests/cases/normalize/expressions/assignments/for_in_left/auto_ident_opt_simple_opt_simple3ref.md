# Preval test case

# auto_ident_opt_simple_opt_simple3ref.md

> Normalize > Expressions > Assignments > For in left > Auto ident opt simple opt simple3ref
>
> Normalization of assignments should work the same everywhere they are

## Options

We want to see whether the last read of `a` can reach the two assigns inside the loop.

It should be reachable because when that assignment happens the loop goes round
again and it might break before encountering the a=undefined assignment. That would
lead the final `a` to observe the second assignment.

- refTest

## Input

`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam$1 /*:object*/ = { x: 1 };
const tmpForInGenNext /*:unknown*/ = $forIn(tmpCalleeParam$1);
const tmpObjLitVal /*:object*/ = { y: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGenNext();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    a = undefined;
    const tmpChainElementObject /*:unknown*/ = tmpObjLitVal;
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    let tmpAssignMemLhsObj$1 /*:unknown*/ /*ternaryConst*/ = undefined;
    if (tmpIfTest$3) {
    } else {
      a = tmpChainElementObject.y;
      tmpAssignMemLhsObj$1 = a;
    }
  }
}
$(a);
`````


## Output

(Annotated with pids)

`````filename=intro
let a___7__ = { a___10__: 999, b___13__: 1000 };
const tmpCalleeParam$1___16__ = { x___19__: 1 };
const tmpForInGenNext___22__ = $forIn___24__(tmpCalleeParam$1___25__);
const tmpObjLitVal___27__ = { y___30__: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___33__) {
  /*34*/ const tmpForInNext___38__ = tmpForInGenNext___40__();
  const tmpIfTest___42__ = tmpForInNext___44__.done___45__;
  if (tmpIfTest___47__) {
    /*48*/ break;
  } /*50*/ else {
    a___57__ = undefined___56__;
    const tmpChainElementObject___59__ = tmpObjLitVal___60__;
    const tmpIfTest$3___62__ = tmpChainElementObject___64__ == null;
    let tmpAssignMemLhsObj$1___67__ = undefined___68__;
    if (tmpIfTest$3___70__) {
      /*71*/
    } /*72*/ else {
      a___78__ = tmpChainElementObject___76__.y___77__;
      tmpAssignMemLhsObj$1___82__ = a___81__;
    }
  }
}
$(a___86__);
`````


## Todos triggered


None


## Ref tracking result


                          | reads      | read by     | overWrites     | overwritten by
a:
  - w @7       | ########## | 86          | none           | 57
  - w @57      | ########## | 86          | 7,57,78        | 57,78
  - w @78      | ########## | 81,86       | 57             | 57
  - r @81      | 78
  - r @86      | 7,57,78

tmpCalleeParam$1:
  - w @16            | ########## | 25          | none           | none
  - r @25            | 16

tmpForInGenNext:
  - w @22            | ########## | 40          | none           | none
  - r @40            | 22

tmpObjLitVal:
  - w @27            | ########## | 60          | none           | none
  - r @60            | 27

tmpForInNext:
  - w @38            | ########## | 44          | none           | none
  - r @44            | 38

tmpIfTest:
  - w @42            | ########## | 47          | none           | none
  - r @47            | 42

tmpChainElementObject:
  - w @59                 | ########## | 64,76       | none           | none
  - r @64                 | 59
  - r @76                 | 59

tmpIfTest$3:
  - w @62                 | ########## | 70          | none           | none
  - r @70                 | 62

tmpAssignMemLhsObj$1:
  - w @67                 | ########## | not read    | none           | 82
  - w @82                 | ########## | not read    | 67             | none

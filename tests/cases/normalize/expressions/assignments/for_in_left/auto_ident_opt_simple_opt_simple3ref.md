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
let /*___7__*/ a = { /*___10__*/ a: 999, /*___13__*/ b: 1000 };
const /*___16__*/ tmpCalleeParam$1 = { /*___19__*/ x: 1 };
const /*___22__*/ tmpForInGenNext = /*___24__*/ $forIn(/*___25__*/ tmpCalleeParam$1);
const /*___27__*/ tmpObjLitVal = { /*___30__*/ y: $ };
while (/*___33__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*34~82*/ const /*___38__*/ tmpForInNext = /*___40__*/ tmpForInGenNext();
  const /*___42__*/ tmpIfTest = /*___44__*/ tmpForInNext./*___45__*/ done;
  if (/*___47__*/ tmpIfTest) {
    /*48~49*/ break;
  } /*50~82*/ else {
    /*___57__*/ a = /*___56__*/ undefined;
    const /*___59__*/ tmpChainElementObject = /*___60__*/ tmpObjLitVal;
    const /*___62__*/ tmpIfTest$3 = /*___64__*/ tmpChainElementObject == null;
    let /*___67__*/ tmpAssignMemLhsObj$1 = /*___68__*/ undefined;
    if (/*___70__*/ tmpIfTest$3) {
      /*71~71*/
    } /*72~82*/ else {
      /*___78__*/ a = /*___76__*/ tmpChainElementObject./*___77__*/ y;
      /*___82__*/ tmpAssignMemLhsObj$1 = /*___81__*/ a;
    }
  }
}
$(/*___86__*/ a);
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

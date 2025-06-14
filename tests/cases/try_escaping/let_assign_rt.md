# Preval test case

# let_assign_rt.md

> Try escaping > Let assign rt

There was a bug in ref tracking where the final read of x was found to
only be able to reach the assignment to x, not the var decl init.

## Options

- refTest

## Input

`````js filename=intro
const arr = [1, 2, 3];
let x = undefined;
let y = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    x = arr;
    arr.reverse();
    y = [5, 6];
    if (y === $) break;
  } catch {
    $('fail');
  }
}
$(x, y);  // <-- _if_ it breaks, then it must have overwritten x, so init is not reachable here
`````


## Output

(Annotated with pids)

`````filename=intro
const /*___6__*/ arr = [1, 2, 3];
let /*___12__*/ x = /*___13__*/ undefined;
let /*___15__*/ y = 1;
while (/*___18__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*19~73*/ try /*21~65*/ {
    let /*___26__*/ tmpCalleeParam = /*___28__*/ arr[0];
    $(/*___33__*/ tmpCalleeParam);
    /*___37__*/ x = /*___36__*/ arr;
    const /*___39__*/ tmpMCF = /*___41__*/ arr./*___42__*/ reverse;
    /*___45__*/ $dotCall(/*___46__*/ tmpMCF, /*___47__*/ arr, `reverse`);
    /*___55__*/ y = [5, 6];
    const /*___57__*/ tmpIfTest = /*___59__*/ y === $;
    if (/*___62__*/ tmpIfTest) {
      /*63~64*/ break;
    } /*65~65*/ else {
    }
  } catch (/*___67__*/ e) /*68~73*/ {
    $(`fail`);
  }
}
$(/*___77__*/ x, /*___78__*/ y);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
arr:
  - w @6       | ########## | 28,36,41,47 | none           | none
  - r @28      | 6
  - r @36      | 6
  - r @41      | 6
  - r @47      | 6

x:
  - w @12      | ########## | not read    | none           | 37
  - w @37      | ########## | 77          | 12,37          | 37
  - r @77      | 37

y:
  - w @15      | ########## | not read    | none           | 55
  - w @55      | ########## | 59,78       | 15,55          | 55
  - r @59      | 55
  - r @78      | 55

tmpCalleeParam:
  - w @26          | ########## | 33          | none           | none
  - r @33          | 26

tmpMCF:
  - w @39          | ########## | 46          | none           | none
  - r @46          | 39

tmpIfTest:
  - w @57          | ########## | 62          | none           | none
  - r @62          | 57

e:
  - w @67          | ########## | not read    | none           | none

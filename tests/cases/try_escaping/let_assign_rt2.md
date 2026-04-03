# Preval test case

# let_assign_rt2.md

> Try escaping > Let assign rt2

There was a bug in ref tracking where the final read of x was found to
only be able to reach the assignment to x, not the var decl init.

## Options

- refTest

## Input

`````js filename=intro
let x = undefined;
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    $('before');
    x = $(1);
    if (x) break;
  } catch {
    $('fail');
  }
}
$(x);  // <-- x can reach both writes, not just the assign
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = /*___5__*/ undefined;
/* stmt(6): */ while (/*___7__*/ $LOOP_NO_UNROLLS_LEFT) {
  /*8~34*/ /* stmt(9): */ try /*10~26*/ {
    /* stmt(11): */ $(`before`);
    /* stmt(16): */ /*___21__*/ x = $(1);
    /* stmt(22): */ if (/*___23__*/ x) {
      /*24~25*/ /* stmt(25): */ break;
    } /*26~26*/ else {
    }
  } catch (/*___28__*/ e) /*29~34*/ {
    /* stmt(30): */ $(`fail`);
  }
}
/* stmt(35): */ $(/*___38__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 21
  - w @21      | ########## | 23,38       | 4,21           | 21
  - r @23      | 21
  - r @38      | 21

e:
  - w @28      | ########## | not read    | none           | none

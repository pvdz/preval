# Preval test case

# label_finally_finally_if_true_break_single_read3.md

> Ref tracking > Done > Label finally finally if true break single read3
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;      // unobservable
back: {
  x = 3;        // unobservable (always becomes 4)
  try {
    x = 4;      // unobservable (always becomes 5 unless thrown)
    break back;
  } finally {
    x = 5;
  }
  x = 6;        // unreachable
}
$(x);           // x=5
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ back: /*8~60*/ {
  /* stmt(12): */ /*___15__*/ x = 3;
  /* stmt(16): */ let /*___17__*/ $implicitThrow = false;
  /* stmt(19): */ let /*___20__*/ $finalStep = false;
  /* stmt(22): */ let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  /* stmt(25): */ /*___26__*/ $finally: /*27~48*/ {
    /* stmt(28): */ try /*29~39*/ {
      /* stmt(30): */ /*___33__*/ x = 4;
      /* stmt(34): */ /*___37__*/ $finalStep = true;
      /* stmt(38): */ break /*___39__*/ $finally;
    } catch (/*___41__*/ $finalImplicit) /*42~48*/ {
      /* stmt(43): */ /*___46__*/ x = 5;
      /* stmt(47): */ throw /*___48__*/ $finalImplicit;
    }
  }
  /* stmt(49): */ /*___52__*/ x = 5;
  /* stmt(53): */ if (/*___54__*/ $implicitThrow) {
    /*55~57*/ /* stmt(56): */ throw /*___57__*/ $finalCatchArg;
  } /*58~60*/ else {
    /* stmt(59): */ break /*___60__*/ back;
  }
}
/* stmt(61): */ $(/*___64__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 15
  - w @15      | ########## | not read    | 4              | 33,46,52
  - w @33      | ########## | not read    | 15             | 46,52
  - w @46      | ########## | not read    | 15,33          | none
  - w @52      | ########## | 64          | 15,33          | none
  - r @64      | 52

$implicitThrow:
  - w @17          | ########## | 54          | none           | none
  - r @54          | 17

$finalStep:
  - w @20          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 20             | none

$finalCatchArg:
  - w @23          | ########## | 57          | none           | none
  - r @57          | 23

$finalImplicit:
  - w @41          | ########## | 48          | none           | none
  - r @48          | 41

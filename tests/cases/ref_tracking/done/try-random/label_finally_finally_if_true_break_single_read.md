# Preval test case

# label_finally_finally_if_true_break_single_read.md

> Ref tracking > Done > Try-random > Label finally finally if true break single read
> 
> A break that travels through two finally nodes before reaching its label.
>
> This was actually a regression as the whole thing was collapsed, eliminating the label and if completely so the condition was ignored.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
back: {
  try {
    x = 2;
  } finally {
    x = 3;
    try {
      x = 4;
      if ($(true)) {
        x = 5;
        break back;
      }
      x = 6;
    } finally {
      x = 7;
    }
    x = 8;
  }
  x = 9;
}
$(x); // x=7 9 (the break still jumps over 9 once)
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ /*___7__*/ back: /*8~121*/ {
  /* stmt(14): */ let /*___15__*/ $implicitThrow$1 = false;
  /* stmt(17): */ let /*___18__*/ $finalCatchArg$1 = /*___19__*/ undefined;
  /* stmt(20): */ try /*21~25*/ {
    /* stmt(22): */ /*___25__*/ x = 2;
  } catch (/*___27__*/ $finalImplicit$1) /*28~36*/ {
    /* stmt(29): */ /*___32__*/ $implicitThrow$1 = true;
    /* stmt(33): */ /*___36__*/ $finalCatchArg$1 = /*___35__*/ $finalImplicit$1;
  }
  /* stmt(37): */ /*___40__*/ x = 3;
  /* stmt(41): */ let /*___42__*/ $implicitThrow = false;
  /* stmt(44): */ let /*___45__*/ $finalStep = false;
  /* stmt(47): */ let /*___48__*/ $finalCatchArg = /*___49__*/ undefined;
  /* stmt(50): */ /*___51__*/ $finally: /*52~91*/ {
    /* stmt(53): */ try /*54~82*/ {
      /* stmt(56): */ /*___59__*/ x = 4;
      /* stmt(60): */ const /*___61__*/ tmpIfTest = $(true);
      /* stmt(65): */ if (/*___66__*/ tmpIfTest) {
        /*67~77*/ /* stmt(68): */ /*___71__*/ x = 5;
        /* stmt(72): */ /*___75__*/ $finalStep = true;
        /* stmt(76): */ break /*___77__*/ $finally;
      } /*78~82*/ else {
        /* stmt(79): */ /*___82__*/ x = 6;
      }
    } catch (/*___84__*/ $finalImplicit) /*85~91*/ {
      /* stmt(86): */ /*___89__*/ x = 7;
      /* stmt(90): */ throw /*___91__*/ $finalImplicit;
    }
  }
  /* stmt(92): */ /*___95__*/ x = 7;
  /* stmt(96): */ if (/*___97__*/ $implicitThrow) {
    /*98~100*/ /* stmt(99): */ throw /*___100__*/ $finalCatchArg;
  } /*101~121*/ else {
    /* stmt(102): */ if (/*___103__*/ $finalStep) {
      /*104~106*/ /* stmt(105): */ break /*___106__*/ back;
    } /*107~121*/ else {
      /* stmt(108): */ /*___111__*/ x = 8;
      /* stmt(112): */ if (/*___113__*/ $implicitThrow$1) {
        /*114~116*/ /* stmt(115): */ throw /*___116__*/ $finalCatchArg$1;
      } /*117~121*/ else {
        /* stmt(118): */ /*___121__*/ x = 9;
      }
    }
  }
}
/* stmt(122): */ $(/*___125__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 25,40
  - w @25      | ########## | not read    | 4              | 40
  - w @40      | ########## | not read    | 4,25           | 59,89
  - w @59      | ########## | not read    | 40             | 71,82,89
  - w @71      | ########## | not read    | 59             | 89,95
  - w @82      | ########## | not read    | 59             | 89,95
  - w @89      | ########## | not read    | 40,59,71,82    | none
  - w @95      | ########## | 125         | 71,82          | 111
  - w @111     | ########## | not read    | 95             | 121
  - w @121     | ########## | 125         | 111            | none
  - r @125     | 95,121

$implicitThrow$1:
  - w @15            | ########## | 113         | none           | 32
  - w @32            | ########## | 113         | 15             | none
  - r @113           | 15,32

$finalCatchArg$1:
  - w @18            | ########## | 116         | none           | 36
  - w @36            | ########## | 116         | 18             | none
  - r @116           | 18,36

$finalImplicit$1:
  - w @27            | ########## | 35          | none           | none
  - r @35            | 27

$implicitThrow:
  - w @42            | ########## | 97          | none           | none
  - r @97            | 42

$finalStep:
  - w @45            | ########## | 103         | none           | 75
  - w @75            | ########## | 103         | 45             | none
  - r @103           | 45,75

$finalCatchArg:
  - w @48            | ########## | 100         | none           | none
  - r @100           | 48

tmpIfTest:
  - w @61            | ########## | 66          | none           | none
  - r @66            | 61

$finalImplicit:
  - w @84            | ########## | 91          | none           | none
  - r @91            | 84

package libraryui.application.data.entity;

import libraryui.application.data.entity.base.PersistentNamed;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
@Data
@Component
public class ApiSession extends PersistentNamed {

    private Long userId;

    private String authToken;

    private ArrayList<UserGroup> userGroups;


}
